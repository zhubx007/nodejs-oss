# nodejs-oss

s3 with aws-sdk-js(https://github.com/aws/aws-sdk-js)

## 环境准备

- 已存在一个对象存储的环境，可以参看 [ceph-rgw](https://docs.ceph.com/en/nautilus/start/quick-rgw/)
- 安装 nodejs 环境

    ```bash
    # for ubuntu
    apt install nodejs
    apt install npm
    ```

    ```bash
    # for centos
    cd /usr/local/src/
    wget http://nodejs.org/dist/v0.10.24/node-v0.10.24.tar.gz
    tar zxvf node-v0.10.24.tar.gz
    cd node-v0.10.24
    ./configure --prefix=/usr/local/node/0.10.24
    make
    make install
    vim /etc/profile
    #set for nodejs
    export NODE_HOME=/usr/local/node/0.10.24
    export PATH=$NODE_HOME/bin:$PATH
    ```

## 开始执行

- 安装 `aws-sdk`

    ```bash
    npm install aws-sdk
    ```

- 替换脚本中的未知参数，此参数与对象存储中的 AK/SK 以及 Endpoint 有关

    ```bash
    endpoint=""
    accessKeyId=""
    secretAccessKey=""
    for i in `ls -la nodejs_oss | grep ".js" | awk -F " " '{print $9}'`;do sed -i "s/{{ endpoint }}/$endpoint/g" "nodejs_oss/"$i;sed -i "s/{{ accessKeyId }}/$accessKeyId/g" "nodejs_oss/"$i;sed -i "s/{{ secretAccessKey }}/$secretAccessKey/g" "nodejs_oss/"$i;done
    ```

- 执行脚本，例如

    ```bash
    nodejs oss/00-init-conn.js
    ```
