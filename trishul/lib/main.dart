import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:signature/signature.dart';
import 'package:image/image.dart' as img;
import 'package:tflite_flutter/tflite_flutter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SignaturePage(),
    );
  }
}

class SignaturePage extends StatefulWidget {
  const SignaturePage({super.key});

  @override
  State<SignaturePage> createState() => _SignaturePageState();
}

class _SignaturePageState extends State<SignaturePage> {
  final SignatureController _controller = SignatureController(
    penStrokeWidth: 8,
    penColor: Colors.white,
    exportBackgroundColor: Colors.black,
  );

  // late Interpreter _interpreter;

  @override
  void initState() { 
    super.initState();
    // _loadModel();
  }

  // Future<void> _loadModel() async {
  //   try {
  //     _interpreter = await Interpreter.fromAsset('assets/mnist.tflite');
  //   } on Exception catch (e) {
  //     alert(e.toString());
  //   }
  // }

  /// Converts the signature into a [1,28,28,1] Float32 input for MNIST
  Future<List<List<List<double>>>> _preprocessSignature() async {
    final Uint8List? data = await _controller.toPngBytes();
    if (data == null) return [];

    // Decode image
    final img.Image? raw = img.decodeImage(data);
    if (raw == null) return [];

    // Resize to 28x28
    final img.Image resized = img.copyResize(raw, width: 28, height: 28);

    // Convert pixels to grayscale [0,1]
    final input = List.generate(
      1,
      (i) => List.generate(
        28,
        (y) => List.generate(
          28,
          (x) {
            final pixel = resized.getPixel(x, y);
            final r = pixel.r.toDouble();
            final g = pixel.g.toDouble();
            final b = pixel.b.toDouble();

            // average RGB → grayscale, normalize to [0,1]
            return (r + g + b) / 3.0 / 255.0;
          },
        ),
      ),
    );

    return input;
  }

  Future<void> _predict() async {
    final input = await _preprocessSignature();

    // Reshape input -> [1,28,28,1]
    var reshapedInput = input.reshape([1, 28, 28, 1]);

    // Output -> [1,10]
    var output = List.filled(10, 0.0).reshape([1, 10]);

    // _interpreter.run(reshapedInput, output);
    print(reshapedInput);

    // Find predicted digit
    int predictedDigit = 0;
    // double maxProb = output[0][0];
    
    // for (int i = 1; i < 10; i++) {
    //   if (output[0][i] > maxProb) {
    //     maxProb = output[0][i];
    //     predictedDigit = i;
    //   }
    // }

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text("Predicted Digit: $predictedDigit")),
    );
  }

  void alert(String content){
    showAboutDialog(context)=>AlertDialog(
      title: Text("Error"),
      content: Text(content),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
//    _interpreter.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: const Text("Digit Recognizer")),
      body: Column(
        children: [

          Signature(
            controller: _controller,
            width: double.infinity,
            height: 300,
            backgroundColor: Colors.grey[200]!,
          ),
          
          const SizedBox(height: 20),
          
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                onPressed: () => _controller.clear(),
                child: const Text("Clear"),
              ),
              ElevatedButton(
                onPressed: _predict,
                child: const Text("Predict"),
              ),
            ],
          ),

        ],
      ),
    );
  }
}
