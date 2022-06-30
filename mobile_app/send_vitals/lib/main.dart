import 'package:flutter/material.dart';
import 'sendEmail.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'tensorflow.dart';

void main() {
  WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Map details = {
    "name": '',
    "docEmail": '',
    "age": '',
    'gender': '',
    "height": '',
    "weight": '',
    "bp": '',
    "temp": '',
    "heart": '',
    "respiration": '',
    "pastIllness": '',
  };

  @override
  void initState() {
    super.initState();
    initialization();
  }

  void initialization() async {
    // This is where you can initialize the resources needed by your app while
    // the splash screen is displayed.  Remove the following example because
    // delaying the user experience is a bad design practice!
    // ignore_for_file: avoid_print
    print('ready in 2...');
    await Future.delayed(const Duration(seconds: 1));
    print('ready in 1...');
    await Future.delayed(const Duration(seconds: 1));
    print('go!');
    FlutterNativeSplash.remove();
  }

  void updateDetails(v) {
    setState(() {
      details = v;
    });
  }

  void sendEmail() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => EmailSender(data: details)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text("Enter Details..."),
          backgroundColor: Colors.blue,
        ),
        body: Container(
          margin: EdgeInsets.all(20.0),
          child: ListView(
            children: [
              TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => Tensorflow()),
                    );
                  },
                  child: Text('Quick Skin analysis')),
              TextField(
                decoration: const InputDecoration(label: Text("Doctor Email")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["docEmail"] = v;
                  updateDetails(tempDetails);
                },
              ),
              TextField(
                decoration: const InputDecoration(label: Text("Patient Name")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["name"] = v;
                  updateDetails(tempDetails);
                },
              ),
              TextField(
                decoration: const InputDecoration(label: Text("Age")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["age"] = v;
                  updateDetails(tempDetails);
                },
              ),
              TextField(
                decoration: const InputDecoration(label: Text("Gender")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["gender"] = v;
                  updateDetails(tempDetails);
                },
              ),
              TextField(
                decoration: const InputDecoration(label: Text("Height(cm)")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["height"] = v;
                  updateDetails(tempDetails);
                },
              ),
              TextField(
                decoration: const InputDecoration(label: Text("Weight(kg)")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["weight"] = v;
                  updateDetails(tempDetails);
                },
              ),
              TextField(
                decoration:
                    const InputDecoration(label: Text("Blood Pressure(mmHg)")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["bp"] = v;
                  updateDetails(tempDetails);
                },
              ),
              TextField(
                decoration:
                    const InputDecoration(label: Text("Temperature(C)")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["temp"] = v;
                  updateDetails(tempDetails);
                },
              ),
              TextField(
                decoration:
                    const InputDecoration(label: Text("Heart Rate(bpm)")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["heart"] = v;
                  updateDetails(tempDetails);
                },
              ),
              TextField(
                decoration: const InputDecoration(label: Text("Respiration")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["respiration"] = v;
                  updateDetails(tempDetails);
                },
              ),
              TextField(
                decoration: const InputDecoration(label: Text("Past Illness")),
                onChanged: (v) {
                  Map tempDetails = details;
                  tempDetails["pastIllness"] = v;
                  updateDetails(tempDetails);
                },
              ),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          backgroundColor: Colors.blue,
          onPressed: sendEmail,
          child: const Icon(Icons.navigate_next),
        ),
      ),
    );
  }
}
