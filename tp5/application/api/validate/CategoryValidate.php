<?php
/**
 * Created by PhpStorm.
 * User: SILUOZHE
 * Date: 2019/1/2
 * Time: 21:17
 */

namespace app\api\validate;


class CategoryValidate extends BaseValidate
{
    protected $rule = [
        "name" => "require",
        "topic_img_id" => "require|isPositiveInteger|checkImgID",
    ];
}