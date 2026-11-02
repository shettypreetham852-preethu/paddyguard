"""
PaddyGuard AI - Deep Learning Model Training Pipeline
======================================================
Architecture: MobileNetV2 / ResNet50 Transfer Learning for Paddy Disease Classification
Target Classes: 7 Classes
  1. Bacterial Leaf Blight
  2. Brown Spot
  3. Healthy
  4. Leaf Blast
  5. Leaf Smut
  6. Sheath Blight
  7. Tungro

Dataset: Paddy Doctor / Kaggle Rice Leaf Disease Dataset (~10,400+ images)
Usage:
  python train_model.py --data_dir ./data/paddy_doctor --epochs 40 --batch_size 32 --model_type mobilenetv2
"""

import os
import sys
import argparse
from pathlib import Path

def train_keras_mobilenet(data_dir: str, epochs: int, batch_size: int, output_path: str):
    print("=" * 60)
    print(" PaddyGuard AI - Training MobileNetV2 CNN Classifier")
    print("=" * 60)

    try:
        import tensorflow as tf
        from tensorflow.keras import layers, models, optimizers, callbacks
    except ImportError:
        print("[ERROR] TensorFlow is required for training. Install with: pip install tensorflow")
        sys.exit(1)

    IMG_SIZE = (224, 224)
    AUTOTUNE = tf.data.AUTOTUNE

    print(f"Loading dataset from: {data_dir}")
    train_ds = tf.keras.utils.image_dataset_from_directory(
        data_dir,
        validation_split=0.2,
        subset="training",
        seed=1337,
        image_size=IMG_SIZE,
        batch_size=batch_size,
        label_mode="categorical"
    )

    val_ds = tf.keras.utils.image_dataset_from_directory(
        data_dir,
        validation_split=0.2,
        subset="validation",
        seed=1337,
        image_size=IMG_SIZE,
        batch_size=batch_size,
        label_mode="categorical"
    )

    class_names = train_ds.class_names
    num_classes = len(class_names)
    print(f"Detected {num_classes} classes: {class_names}")

    # Data Augmentation Layer for agricultural leaf robustness
    data_augmentation = tf.keras.Sequential([
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
        layers.RandomZoom(0.2),
        layers.RandomContrast(0.2),
    ], name="leaf_augmentation")

    # Base Pretrained Model
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights="imagenet"
    )
    base_model.trainable = False # Freeze feature extraction backbone initially

    # Classification Head
    inputs = tf.keras.Input(shape=(224, 224, 3))
    x = data_augmentation(inputs)
    x = tf.keras.applications.mobilenet_v2.preprocess_input(x)
    x = base_model(x, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.BatchNormalization()(x)
    x = layers.Dense(256, activation="relu")(x)
    x = layers.Dropout(0.4)(x)
    outputs = layers.Dense(num_classes, activation="softmax", name="predictions")(x)

    model = tf.keras.Model(inputs, outputs, name="PaddyGuard_MobileNetV2")

    model.compile(
        optimizer=optimizers.Adam(learning_rate=1e-3),
        loss="categorical_crossentropy",
        metrics=["accuracy", tf.keras.metrics.Precision(name="precision"), tf.keras.metrics.Recall(name="recall")]
    )

    model.summary()

    # Training Callbacks
    cb_early_stop = callbacks.EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)
    cb_reduce_lr = callbacks.ReduceLROnPlateau(monitor="val_loss", factor=0.2, patience=3, min_lr=1e-6)
    cb_checkpoint = callbacks.ModelCheckpoint(output_path, monitor="val_accuracy", save_best_only=True)

    print("\n[Phase 1] Training classification head...")
    train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)

    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=epochs // 2,
        callbacks=[cb_early_stop, cb_reduce_lr]
    )

    # Fine-Tuning Phase
    print("\n[Phase 2] Fine-tuning top 30 layers of MobileNetV2 backbone...")
    base_model.trainable = True
    for layer in base_model.layers[:-30]:
        layer.trainable = False

    model.compile(
        optimizer=optimizers.Adam(learning_rate=1e-5), # Lower learning rate
        loss="categorical_crossentropy",
        metrics=["accuracy", tf.keras.metrics.Precision(name="precision"), tf.keras.metrics.Recall(name="recall")]
    )

    history_fine = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=epochs // 2,
        callbacks=[cb_early_stop, cb_reduce_lr, cb_checkpoint]
    )

    # Save final model for PaddyGuard backend
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    model.save(output_path)
    print("=" * 60)
    print(f" SUCCESS: Model saved directly to: {output_path}")
    print(f" PaddyGuard backend will now automatically use this model for live inferences!")
    print("=" * 60)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train Paddy Disease Detection CNN Model")
    parser.add_argument("--data_dir", type=str, default="./data/paddy_doctor", help="Path to folder with class subdirectories")
    parser.add_argument("--epochs", type=int, default=30, help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=32, help="Batch size")
    parser.add_argument("--output", type=str, default="../app/ml/model.h5", help="Output path for trained model")

    args = parser.parse_args()
    train_keras_mobilenet(args.data_dir, args.epochs, args.batch_size, args.output)
