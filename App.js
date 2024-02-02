import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TextInput, TouchableOpacity, Text, View,Image } from 'react-native';



export default function App() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
      </View>
      <View style={styles.body}>
        
        
        <Image
            source={require('./open.png')}
            style={styles.image}
          />
        <View style={styles.loginForm}>
          <Text style={styles.loginText}>Ingresa tu contraseña</Text>
          <TextInput style={styles.input} placeholder="Correo" />
          <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} />
          <Text style={styles.footerLink}>¿Olvidó su contraseña?</Text>
          <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>¿No tiene una cuenta? <Text style={styles.footerLink}>Regístrese</Text> </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerLine}></View>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Condiciones de uso</Text>
          <View style={styles.footerLinkSeparator}></View>
          <Text style={styles.footerLink}>Política de privacidad</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 18,
    marginBottom: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    
   
  },
  image: {

    width: 40, // Tamaño de la imagen
    height: 40, // Tamaño de la imagen
    marginBottom: 90,
  },
  loginForm: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 15,
    textAlign: 'center', //centrar texto
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    marginBottom: 10,
    color:'green',
  },
  continueButton: {
    backgroundColor: 'rgb(55, 205, 165)',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  continueButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    height: 50,
    backgroundColor: '#fff',
  },
  footerLine: {
    height: 1,
    backgroundColor: '#ccc',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 49,
  },
  footerLink: {
    color: 'rgb(55, 205, 165)',
    marginRight: 10,
    marginLeft: 10,
  },
  footerLinkSeparator: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
  },
});
