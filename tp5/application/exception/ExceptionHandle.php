<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-19
 * Time: 9:22
 */
namespace app\exception;

use Exception;
use think\exception\Handle;
use think\Request;

/***
 * 全局异常处理类
 * Class ExceptionHandle
 * @package app\exception？
 */

class ExceptionHandle extends Handle {
    public $msg;
    public $code;
    public $error_code;

    public function render(Exception $e)
    {
        if ($e instanceof BaseException) {
            $this->msg = $e->msg;
            $this->error_code = $e->error_code;
            $this->code = $e->code;
        }
        else{
            //调试模式直接返回错误信息
            if(config('app_debug')){
                return parent::render($e);
            }
            $this->msg = "系统内部错误";
            $this->error_code = 999;
            $this->code = 500;
        }
        $url = Request::instance()->url();
        return json(["msg" => $this->msg, "error_code" => $this->error_code, "url" => $url], $this->code);
    }


}