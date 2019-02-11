<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-18
 * Time: 14:44
 */

namespace app\api\validate;

use app\api\model\Category as CategoryModel;
use app\api\model\Image as ImageModel;

/**
 * 对商品创建、更新进行验证
 * Class ProductValidate
 * @package app\api\validate
 */
class ProductValidate extends BaseValidate
{
    protected $rule = [
        "name" => "require",
        "price" => "require|isPositiveInteger",
        "stock" => "require|isPositiveInteger",
        "main_img_url" => "require",
        "img_id" => "require|isPositiveInteger|checkImgID",
        "category_id" => "require|isPositiveInteger|checkCategoryID"
    ];

    protected $message = [
        "category_id.checkCategoryID" => "添加商品的分类不存在！",
        "img_id.checkImgID" => "添加商品的图片不存在！"
    ];

    protected function checkCategoryID($value){
        $category = CategoryModel::get($value);
        if ($category){
            return true;
        }
        return false;
    }

    protected function checkImgID($value){
        $img = ImageModel::get($value);
        if ($img){
            return true;
        }
        return false;
    }
}