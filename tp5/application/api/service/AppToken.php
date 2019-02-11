<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-06
 * Time: 11:29
 */

namespace app\api\service;

use app\api\model\ThirdApp;
use app\exception\TokenException;

/**
 * 第三方APP, 如CMS
 * Class AppToken
 * @package app\api\service
 */
class AppToken extends Token
{
    public function getToken($username, $password){
        $password =$this->encryption($password);
        $app = (new ThirdApp())->check($username, $password);
        if(!$app){
            throw new TokenException('授权失败', 10004);
        }
        $scope = $app->scope;
        $uid = $app->id;
        $username = $app->app_id;
        $values = [
            'scope' => $scope,
            'uid' => $uid,
            "username" => $username
        ];
        $token = $this->saveDataToCache($values);
        return $token;
    }

    /*
     * 对密码进行加密
     * @param $password
     */
    public function encryption($password){
        return md5(md5($password));
    }
}