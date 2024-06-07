import groovy.json.JsonBuilder
import groovy.json.JsonParserType
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import groovy.json.JsonSlurperClassic

def getJsonValue(String json_str, String key) {
    getJson(json_str)[key]
}

def getJson(String json_str) {
    def cfg = new JsonSlurperClassic().parseText(
        new JsonBuilder(
            new JsonSlurper()
                .setType(JsonParserType.LAX)
                .parseText(json_str)
        )
        .toString()
    )
    cfg
}

def backedUplodaType = 'oss'
// 项目目录名称
def backendProjectName = 'backend-shop' // 后端项目目录名称
def weappProjectName = 'taro-shop-component' // 小程序项目目录名

def currentWeappVersion = '' // 当前小程序发布版本


// TODO shop：不同环境的发布桶名称修改
// 后台管理的发布桶
def shopOss = [dev: 'wmm-shop-dev', uat: 'wmm-shop-test', prd: "wmm-shop"]
// web h5发布桶
def shopH5Oss = [dev: 'wmm-shop-h5-dev', uat: 'wmm-shop-h5-test', prd: "wmm-shop-h5"]

pipeline {
    agent any
    tools {
        nodejs "16.20.1"
    }
    environment {
        // 阿里云OSS配置
        // TODO shop：阿里云OSS配置
        accessKeyId = "LTAI5tJ8CDZYZ36ziTPtEWHi"
        // 这里采用jenkins的权限获取。可以直接写成字符串
        accessKeySecret = credentials('LTAI5tJ8CDZYZ36ziTPtEWHi')
        endpoint = "oss-cn-shanghai.aliyuncs.com"
    }
    parameters {
        extendedChoice(
            name: 'projectTypes',
            description: '需要发布的项目 -- backend:后台管理系统, weapp:小程序, h5:web端（按住CTRL点击可多选）',
            type: 'PT_MULTI_SELECT',
            value: "backend,weapp,h5"
        )
        extendedChoice(
            name: 'stage',
            description: '发布环境 -- dev:开发环境(小程序无开发环境),uat:测试环境,prd:正式环境',
            type: 'PT_SINGLE_SELECT',
            value: "dev,uat,prd"
        )
        booleanParam(name: 'install', defaultValue: false, description: '是否需要执行pnpm install？（跳过安装可加快构建速度）')
    }
    stages {
        //
        stage('check') {
          steps {
              script {
                // 如果是构建生产环境的小程序。需要手动输入发布版本
                if (params.projectTypes.contains("weapp") && params.stage == 'build') {
                  def packPath = "${env.WORKSPACE}/packages/${weappProjectName}/package.json"
                  weappPack = readFile file: packPath, encoding: "UTF-8"
                  println weappPack

                  packJson = getJson(weappPack)
                  currentWeappVersion = packJson['version']
                  def result = input(
                      message: "确认发布小程序?",
                      ok: '确定',
                      parameters: [
                        string(name: 'version', defaultValue: "", description: "当前版本:${currentWeappVersion}", trim: true)
                      ]
                  )
                  currentWeappVersion = result
                  // TODO: 写入package.json并打tag和推送
                  // packJson["version"] = result
                  // def packStr = JsonOutput.prettyPrint(JsonOutput.toJson(packJson))
                  // writeFile file: packPath, text: packStr, encoding: "UTF-8"
                }
              }
          }
        }
        // 环境检查
        stage('preparation') {
            steps {
                sh "npm install pnpm@8 -g"
                sh "npm -v && pnpm -v"
                echo "构建阶段 ${params.stage}"
            }
        }
        // 安装依赖
        stage('install') {
            steps {
                script {
                    if (params.install) {
                        echo "安装依赖"
                        def installText = "pnpm install --no-frozen-lockfile"

                        if (params.projectTypes.contains("backend")) {
                            installText += " --filter @wmeimob/${backendProjectName}..."
                        }

                        if (params.projectTypes.contains("weapp") && params.stage != 'development') {
                            installText += " --filter @wmeimob/${weappProjectName}..."
                            installText += " && pnpm add miniprogram-ci minimist -D --filter @wmeimob/${weappProjectName}"
                        }

                        if (params.projectTypes.contains("h5") ) {
                            installText += " --filter @wmeimob/${weappProjectName}..."
                        }
                        // echo installText
                        sh installText
                    }
                }
            }
        }
        stage('build') {
            parallel {
                // 构建后台管理系统
                stage('build-backend') {
                    when {
                        expression {
                            params.projectTypes.contains("backend")
                        }
                    }
                    steps {
                        echo "构建项目 ${backendProjectName} "
                        // 进入项目 执行构建
                        sh "cd packages/${backendProjectName} && pnpm build:${stage} && exit 0"

                        script {
                          if (backedUplodaType == 'oss') {
                            // 上传阿里云
                            aliyunOSSUpload(
                                accessKeyId: env.accessKeyId,
                                accessKeySecret: env.accessKeySecret,
                                endpoint: env.endpoint,
                                bucketName: shopOss[params.stage],
                                localPath: "/packages/${backendProjectName}/dist",
                                maxRetries: "3",
                                remotePath: "/"
                            )
                          } else {
                            // 推送至ssh
                            sh "cd packages/${backendProjectName} && tar -czvf dist.tar.gz dist"
                            sshPublisher(
                              publishers: [
                                sshPublisherDesc(
                                  configName: 'project_sandeli',
                                  transfers: [
                                    sshTransfer(
                                      removePrefix: "packages/${backendProjectName}/",
                                      sourceFiles: "packages/${backendProjectName}/dist.tar.gz",
                                      remoteDirectory: "sandeli_tmp",
                                      execCommand: """rm -rf /usr/local/nginx/html/spirit_${params.stage}/* && tar -zvxf /sandeli_tmp/dist.tar.gz -C /usr/local/nginx/html/spirit_${params.stage}""",
                                      cleanRemote: false,
                                      excludes: '',
                                      execTimeout: 120000,
                                      flatten: false,
                                      makeEmptyDirs: false,
                                      noDefaultExcludes: false,
                                      patternSeparator: '[, ]+',
                                      remoteDirectorySDF: false,
                                    )
                                  ],
                                  usePromotionTimestamp: false,
                                  useWorkspaceInPromotion: false,
                                  verbose: false
                                )
                              ]
                            )
                          }
                        }
                    }
                }
                // 构建小程序
                stage('build-weapp') {
                    when {
                      allOf {
                        expression { return params.projectTypes.contains("weapp") };
                        expression { return params.stage != 'development' };
                      }
                    }
                    steps {
                        echo "构建项目 ${weappProjectName}"
                        sh "cd packages/${weappProjectName} && pnpm build:${stage}:weapp"
                        // 上传小程序代码
                        sh "cd packages/${weappProjectName} && node taro.upload.js  --version=${currentWeappVersion}"
                    }
                }

                // 构建小程序
                stage('build-h5') {
                    when {
                        expression {
                            params.projectTypes.contains("h5")
                        }
                    }
                    steps {
                        echo "构建项目 ${weappProjectName}"
                        sh """cd packages/${weappProjectName} && pnpm build:${stage}:h5
rm -rf distindex
mkdir distindex
mv ./dist/h5/index.html ./distindex/index.html"""

                        script {
                            // 上传阿里云
                            aliyunOSSUpload(
                                accessKeyId: env.accessKeyId,
                                accessKeySecret: env.accessKeySecret,
                                endpoint: env.endpoint,
                                bucketName: shopH5Oss[params.stage],
                                localPath: "/packages/${weappProjectName}/dist/h5",
                                maxRetries: "3",
                                remotePath: "/"
                            )
                        }

                        script {
                            // 上传index.html 文件 index.html需要最后上传，不然js没上传就更新了版本
                            aliyunOSSUpload(
                                accessKeyId: env.accessKeyId,
                                accessKeySecret: env.accessKeySecret,
                                endpoint: env.endpoint,
                                bucketName: shopH5Oss[params.stage],
                                localPath: "/packages/${weappProjectName}/distindex",
                                maxRetries: "3",
                                remotePath: "/"
                            )
                        }
                    }
                }
            }
        }
    }
}
