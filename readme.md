# Service Management Fronted Web (ES6)

## FirebaseService

    - AuthenticationWithEmail
    - CloundFireStore
    - Storage

how to get key in firebase project

1. open project setting

![project setting](/img/project-setting.png)

2. in firebase sdk snippet choose "codding"

![get key](/img/get-key.png)

set config
```
cp config.example.js config.js

add key to firebaseConfig

```

installl for your project
```
import {
    firebaseRegister
} from './FirebaseService/register';

firebaseRegister.plugin();
```