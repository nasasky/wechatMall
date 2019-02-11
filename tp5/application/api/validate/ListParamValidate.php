<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-04
 * Time: 16:27
 */

namespace app\api\validate;

/**
 * 校验为类列表的参数，如xxx.com?ids=1，2，3
 * @package app\api\validate\
 */
class ListParamValidate extends BaseValidate
{
    protected $rule = [
        "ids" => "require|listParamValidate",
    ];

    protected $message = [
        'ids' => 'ids参数必须为以逗号分隔的多个正整数'
    ];

    public function listParamValidate($value){
        $values = explode(",", $value);
        if (empty($values)){
            return false;
        }
        else{
            foreach ($values as $v){
                $result = $this->isPositiveInteger($v);
                if (!$result){
                    return false;
                }
            }
            return true;
        }
    }
}