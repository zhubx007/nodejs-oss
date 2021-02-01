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

var bucketName = 'my-bucket-02';

var newBucket = {
  Bucket: bucketName,
  CreateBucketConfiguration: {
    LocationConstraint: ""
  }
};

// 创建一个新的bucket
s3.createBucket(newBucket, function (err, data) {
  if (err) {
    console.log("Error: " + err);
  } else {
    console.log("Create bucket: " + bucketName);
    // 列出所有的buckets
    s3.listBuckets(function (err, data) {
      if (err) {
        console.log("Error: " + err);
      } else {
        data.Buckets.forEach(nBucket => {
          console.log("Bucket: " + nBucket.Name)
        });
      }
    });
  }
});
