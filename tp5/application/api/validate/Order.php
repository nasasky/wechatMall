<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-26
 * Time: 18:29
 */

namespace app\api\validate;


class Order extends BaseValidate
{
    protected $rule = [
        "clientProducts" => "checkProducts"
    ];

    protected $singleProductRule = [
        "product_id" => "isPositiveInteger",
        "count" => "isPositiveInteger"
    ];

    protected function checkProducts($value){
        if (!is_array($value)){
            throw new ParameterException([
                'msg' => '商品列表参数错误',
            ]);
        }
        if (!empty($value)){
            throw new ParameterException([
                'msg' => '商品列表不能为空'
            ]);
        }
        foreach ($value as $product){
            $this->checkProduct($product);
        }
        return true;
    }

    protected function checkProduct($product){
        $validate = new BaseValidate($this->singleProductRule);
        $result = $validate->check($product);
        if(!$result){
            throw new ParameterException([
                'msg' => '商品列表参数错误',
            ]);
        }
    }
}