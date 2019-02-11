<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-10
 * Time: 22:44
 */

namespace app\api\validate;


class PagingParameterValidate extends BaseValidate
{
    protected $rule = [
        "size"  => "isPositiveInteger",
        "current_page"  => "isPositiveInteger"
    ];

    protected $message = [
        'page' => '分页参数必须是正整数',
        'size' => '分页参数必须是正整数'
    ];
}