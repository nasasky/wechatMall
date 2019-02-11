<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-24
 * Time: 8:31
 */

namespace app\api\controller;

use think\Controller;
use app\api\service\Token;

class BaseController extends Controller
{
    protected function checkPrimaryScope()
    {
        Token::checkPrimaryScope();
    }

    protected function checkSuperScope()
    {
        Token::needSuperScope();
    }
}