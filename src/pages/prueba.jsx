// import React from 'react';
// import { Button, View } from 'react-native';
// import firebase from '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';

// const MyComponent = () => {
//   const handleButtonPress = () => {
//     const notification = new firebase.notifications.Notification()
//       .setNotificationId('notificationId')
//       .setTitle('Título de la notificación')
//       .setBody('Contenido de la notificación')
//       .setData({
//         // Puedes agregar datos adicionales a la notificación si es necesario
//       })
//       .android.setChannelId('channelId')
//       .android.setSmallIcon('ic_launcher');

//     firebase.notifications().displayNotification(notification);
//   };

//   return (
//     <View>
//       <Button title="Enviar notificación" onPress={handleButtonPress} />
//     </View>
//   );
// };

// export default MyComponent;
