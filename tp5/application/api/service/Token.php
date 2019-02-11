<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-20
 * Time: 20:42
 */
namespace app\api\service;

use app\enum\ScopeEnum;
use app\exception\ForbiddenException;
use app\exception\ParameterException;
use app\exception\TokenException;
use app\exception\UserException;
use think\Cache;
use think\Exception;
use think\Request;

class Token{
    public function generateToken()
    {
        $randChar = getRandChar(32);
        $timestamp = $_SERVER['REQUEST_TIME_FLOAT'];
        $tokenSalt = config('Secure.token_salt');
        return md5($randChar . $timestamp . $tokenSalt);
    }

    /***
     * 获取Token里的变量值
     * @param $key
     * @return mixed
     * @throws Exception
     * @throws TokenException
     */
    public static function getTokenVarByKey($key){
        $token = Request::instance()->header("token");
        $var = Cache::get($token);
        if(!$var){
            throw new TokenException();
        }
        $var = json_decode($var, true);
        if (array_key_exists($key, $var)){
            return $var[$key];
        }
        else{
            throw new Exception('尝试获取的Token变量并不存在');
        }
    }

    public function saveDataToCache($result)
    {
        $key = $this->generateToken();
        $result = json_encode($result);
        $expire_in = config('Setting.token_expire_in');
        $cache = cache($key, $result, $expire_in);
        if ($cache) {
            return $key;
        } else {
            throw new TokenException('服务器缓存异常',10005);
        }
    }

    public static function checkPrimaryScope()
    {
        $scope = self::getTokenVarByKey('scope');
        if ($scope){
            if ($scope == ScopeEnum::User) {
                return true;
            } else {
                throw new ForbiddenException();
            }
        } else {
            throw new TokenException();
        }
    }

    public static function needSuperScope()
    {
        $scope = self::getTokenVarByKey('scope');
        if ($scope){
            if ($scope == ScopeEnum::Super) {
                return true;
            } else {
                throw new ForbiddenException();
            }
        } else {
            throw new TokenException();
        }
    }

    public static function verify(){
        $token = Request::instance()->header("token");
        if (!$token){
            throw new ParameterException("token不允许为空");
        }
        $result = Cache::get($token);
        if ($result){
            return true;
        }
        return false;
    }

    public static function getUserID(){
        return self::getTokenVarByKey("uid");
    }
}