<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-18
 * Time: 21:33
 */
namespace app\api\validate;

use app\exception\ParameterException;
use think\Request;
use think\Validate;

class BaseValidate extends Validate{
    public function toCheck(){
        $data = Request::instance()->param();
        $result = $this->check($data);
        if(!$result){
            throw new ParameterException($this->getError());
        }
        return true;
    }

    protected function isPositiveInteger($value, $rule='', $data='', $field='')
    {
        if (is_numeric($value) && is_int($value + 0) && ($value + 0) > 0) {
            return true;
        }
        return false;
    }

    protected function isEmpty($value, $rule='', $data='', $field='')
    {
        if (empty($value)) {
            return $field . '不允许为空';
        } else {
            return true;
        }
    }

    protected function isMobile($value)
    {
        $isMob = '^1(3|4|5|7|8)[0-9]\d{8}$^';
        $isTel="/^([0-9]{3,4}-)?[0-9]{7,8}$/";
        if (preg_match($isMob, $value) || $result = preg_match($isTel, $value)) {
            return true;
        } else {
            return false;
        }
    }

    public function getDataByRule($arrays)
    {
        if (array_key_exists('user_id', $arrays) | array_key_exists('uid', $arrays)) {
            // 不允许包含user_id或者uid，防止恶意覆盖user_id外键
            throw new ParameterException([
                'msg' => '参数中包含有非法的参数名user_id或者uid'
            ]);
        }
        $newArray = [];
        foreach ($this->rule as $key => $value) {
            $newArray[$key] = $arrays[$key];
        }
        return $newArray;
    }
}