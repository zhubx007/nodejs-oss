// -*- coding: UTF-8 -*-
// Copyright 2021 XXX Inc.
//
//    Licensed under the Apache License, Version 2.0 (the "License"); you may
//    not use this file except in compliance with the License. You may obtain
//    a copy of the License at
//
//         http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
//    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
//    License for the specific language governing permissions and limitations
//    under the License.

var AWS = require('aws-sdk');

var endpoint = "{{ endpoint }}";
var accessKeyId = "{{ accessKeyId }}";
var secretAccessKey = "{{ secretAccessKey }}";

// 建立连接
var s3 = new AWS.S3({
  endpoint: endpoint,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  sslEnabled: false,
  s3ForcePathStyle: true,
  apiVersion: "2006-03-01"
});

var bucketName = 'my-bucket-04';

var newBucket = {
  Bucket: bucketName,
  CreateBucketConfiguration: {
    LocationConstraint: ""
  }
};

var objectName = 'myKey';

var newObject = {
  Bucket: bucketName,
  Key: objectName,
  Body: 'Hello World!'
};

// 创建一个新的bucket
s3.createBucket(newBucket, function (err, data) {
  if (err) {
    console.log("Error of Create Bucket: " + err);
  } else {
    console.log("Create bucket: " + bucketName);
    // 往bucket中存入一个对象
    s3.putObject(newObject, function (err, data) {
      if (err) {
        console.log("Error of Put Object: " + err);
      } else {
        console.log("Put object " + objectName + " into bucket " + bucketName);
        // 列出bucket中所有的对象
        s3.listObjects({ Bucket: bucketName, MaxKeys: 2 }, function (err, data) {
          if (err) {
            console.log("Error of List Objects: " + err);
          } else {
            data.Contents.forEach(nKey => {
              console.log("Object: " + nKey.Key);
            });
          }
        })
      }
    })
  }
})
