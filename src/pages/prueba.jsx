import React, { useEffect } from "react";
import { NativeBaseProvider, Center, Button } from "native-base";

const MyComponent = () => {
    return (
        <NativeBaseProvider>
            <Center>
                <Button>Enviar Notificación</Button>
            </Center>
        </NativeBaseProvider>
    );
};

export default MyComponent;
