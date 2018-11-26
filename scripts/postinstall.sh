    #!/usr/bin/env bash

    # "Solve" one of known issues (using XCode 10 and `react-native init`)
    # https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md#known-issues

    # ONLY FOR RN 0.57.4
    # ==================
    ROOT_PWD=$(pwd)
    cd ./node_modules/react-native
    if [ ! -f ./alreadybuilt.flag.txt ]; then
        ./scripts/ios-install-third-party.sh
        cd ./third-party/glog-0.3.4/
        ../../scripts/ios-configure-glog.sh
        cd $ROOT_PWD
        cd ./node_modules/react-native
        touch alreadybuilt.flag.txt
        cd $ROOT_PWD
    fi
