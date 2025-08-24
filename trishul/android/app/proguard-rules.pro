# Keep TensorFlow Lite classes
-keep class org.tensorflow.lite.** { *; }
-dontwarn org.tensorflow.lite.**

# Keep GPU Delegate classes
-keep class org.tensorflow.lite.gpu.** { *; }
-dontwarn org.tensorflow.lite.gpu.**
