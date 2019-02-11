<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-19
 * Time: 18:54
 */
namespace app\api\controller\v1;

use app\api\service\AppToken;
use app\api\validate\AppTokenValidate;
use app\api\validate\WeChatCodeValidate;
use think\Controller;
use app\api\service\UserToken as ServiceUserToken;
use app\api\service\Token as ServiceToken;

class Token extends Controller
{
    public function getToken($code){
        (new WeChatCodeValidate())->toCheck();
        $token = (new ServiceUserToken($code))->sendCodeToWeChat();
        return [
            "token" => $token
        ];
    }

    /**
     * 获得第三方的Token，如CMS...
     * @param string $username
     * @param string $password
     * @param string $code
     * @return array
     * @throws \app\exception\ParameterException
     * @throws \app\exception\TokenException
     */
    public function getAppToken($username="", $password="", $code=""){
        (new AppTokenValidate())->toCheck();
        $token = (new AppToken())->getToken($username, $password);
        return [
            "token" => $token
        ];
    }

    public function getAppUsername(){
        return ServiceToken::getTokenVarByKey("username");
    }

    public function verify(){
        $valid = ServiceToken::verify();
        return [
            "isValid" => $valid
        ];
    }
}