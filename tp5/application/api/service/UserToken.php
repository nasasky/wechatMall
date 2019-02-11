<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-19
 * Time: 21:39
 */
namespace app\api\service;

use app\api\model\User;
use app\enum\ScopeEnum;
use app\exception\TokenException;
use app\exception\WeChatException;
use think\Exception;
use app\api\model\User as UserModel;


class UserToken extends Token
{
    //客户端code
    private $code;
    //微信app_id
    private $app_id;
    //微信app_secret
    private $app_secret;
    //微信登陆url
    private $login_url;

    public function __construct($code)
    {
        $this->code = $code;
        $this->app_id = config("WeChatSetting.app_id");
        $this->app_secret = config("WeChatSetting.app_secret");
        $this->login_url = sprintf(
            config('WeChatSetting.login_url'), $this->app_id, $this->app_secret, $this->code);
//        echo $this->login_url;
    }

    /***
     * 将客户端传递的code发送到微信服务器，并接受返回的值
     * @throws Exception
     * @throws WeChatException
     */
    public function sendCodeToWeChat()
    {
        $data = curl_post($this->login_url);
        $result = json_decode($data, true);
        if (empty($result)) {
            throw new Exception("微信内部错误");
        }
        else {
            if (array_key_exists("errcode", $result)) {
                throw new WeChatException($result["errmsg"], $result["errcode"]);
            } else {
                return $this->getToken($result);
            }
        }
    }

    public function getToken($result)
    {
        $open_id = $result["openid"];
        $user = (new UserModel())->getUserByOpenID($open_id);
        if ($user) {
            $uid = $user->id;
        } else {
            $uid = $this->createUser($open_id);
        }
        $result = $this->initCacheValue($result, $uid);
        $token = $this->saveDataToCache($result);

        return $token;
    }

    public function initCacheValue($value, $uid)
    {
        $value["uid"] = $uid;
        $value["scope"] = ScopeEnum::User;
        return $value;
    }

    public function createUser($open_id)
    {
        $user = UserModel::create([
            "openid" => $open_id
        ]);
        return $user->id;
    }



}