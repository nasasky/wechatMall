<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-20
 * Time: 20:40
 */
namespace app\api\model;

class User extends BaseModel{
    public function getUserByOpenID($open_id){
        $user = User::where('openid', '=', $open_id)
            ->find();
        return $user;
    }

    public function address(){
        return $this->hasOne("UserAddress", "user_id", "id");
    }
}