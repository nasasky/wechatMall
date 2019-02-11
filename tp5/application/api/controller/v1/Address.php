<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-22
 * Time: 19:14
 */

namespace app\api\controller\v1;


use app\api\model\User;
use app\api\model\UserAddress;
use app\api\validate\AddressValidate;
use app\exception\SuccessMessage;
use app\exception\UserException;
use think\Controller;
use app\api\service\Token;

class Address extends Controller
{
    public function addOrUpdateAddress(){
        $validate = new AddressValidate();
        $validate->toCheck();
        $uid = Token::getTokenVarByKey("uid");
        $user = User::get($uid);
        if(!$user){
            throw new UserException();
        }
        $userAddress = $user->address;
        $data = $validate->getDataByRule(input('post.'));
        if (!$userAddress )
        {
            // 不存在，新建
            $user->address()
                ->save($data);
        }
        else
        {
            // 存在, 更新
            $user->address->save($data);
        }
        return new SuccessMessage();
    }

    public function getAddress(){
        $uid = Token::getUserID();
        $userAddress = (new UserAddress())
            ->where('user_id', $uid)
            ->find();
        if(!$userAddress){
            throw new UserException('用户地址不存在',60001);
        }
        return $userAddress;
    }
}