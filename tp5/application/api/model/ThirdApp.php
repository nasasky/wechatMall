<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-06
 * Time: 11:36
 */

namespace app\api\model;


class ThirdApp extends BaseModel
{
    public function check($username, $password){
        $app = self::where('app_id','=',$username)
            ->where('app_secret', '=',$password)
            ->find();
        return $app;
    }
}