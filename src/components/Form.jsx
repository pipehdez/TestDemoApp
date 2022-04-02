import { View, TextInput, StyleSheet } from "react-native";
import { Button, Text , useToast } from "native-base";
import useForm from "../hooks/useForm";


const Form = ({ initialState, onPress }) => {

  const toast = useToast();

  const { values, handleChange } = useForm(initialState);

  const handleChangeForm = (name, value) => {
    handleChange(name, value);
  };

  const handleSubmit = (values) => {
    if(values.username === "" && values.password === "" ) {
      toast.show({ title: "Usuario y contraseña vacios", placement: "bottom", type: "danger" }) 
    } else if(values.username === "") {
      toast.show({ title: "Usuario vacio", placement: "bottom", type: "danger" })
    } else if(values.password === "") {
      toast.show({ title: "Contraseña vacia", placement: "bottom", type: "danger" })
    } else {
      onPress(values);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={"#fff"}
        onChangeText={(value) => handleChangeForm("username", value)}
        value={values.username}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"#fff"}
        onChangeText={(value) => handleChangeForm("password", value)}
        value={values.password}
        secureTextEntry={true}
      />
      <Button onPress={() => handleSubmit (values)} style={styles.button}>
        <Text style={styles.text}>Entrar</Text>
      </Button>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "yellow",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  button: {
    backgroundColor: "yellow",
    marginTop: 10,
    borderRadius: 5,
  },
  text: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
  },
});
