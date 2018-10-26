    #!/usr/bin/env bash

    # "Solve" one of known issues (using XCode 10 and `react-native init`)
    # https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md#known-issues

    ROOT_PWD=$(pwd)
    cd ./node_modules/react-native
    ./scripts/ios-install-third-party.sh
    cd ./third-party/glog-0.3.5/
    ../../scripts/ios-configure-glog.sh
    cd $ROOT_PWD

