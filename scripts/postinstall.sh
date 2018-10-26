    #!/usr/bin/env bash
    
    cd node_modules/react-native
    scripts/ios-install-third-party.sh
    cd third-party/glog-0.3.5/
    ../../scripts/ios-configure-glog.sh