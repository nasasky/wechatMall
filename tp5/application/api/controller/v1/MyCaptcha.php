<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-05
 * Time: 20:36
 */

namespace app\api\controller\v1;


use think\captcha\Captcha;
use think\Session;

class MyCaptcha
{
    public function getCaptcha(){
        $captcha_config = config("captcha");
        $captcha = new Captcha($captcha_config);
        return $captcha->entry();
    }

}