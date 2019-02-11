<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-18
 * Time: 21:40
 */
namespace app\api\validate;


class IDMustBeIPositiveInt extends BaseValidate {
    protected $rule = [
        'id'  => 'require|isPositiveInteger',
    ];
}