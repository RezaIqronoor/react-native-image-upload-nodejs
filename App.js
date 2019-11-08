import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker';

const App = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        title="Upload Image"
        onPress={() => {
          
          var options = {
            title: 'Select Image',
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          }

          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };


              const data = new FormData();
              data.append('message', 'Image from React Native');
              data.append('image', {
                uri: response.uri,
                type: response.type,
                name: response.fileName
              });

              const config = {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
                body: data,
              };

              fetch("http://46b94eec.ngrok.io/" + "uploadImage", config)
                .then((checkStatusAndGetJSONResponse) => {
                  console.log(checkStatusAndGetJSONResponse);
                }).catch((err) => { console.log(err) });
            }
          });
        }} />
    </View>
  )
}

export default App