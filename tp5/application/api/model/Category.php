<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-04
 * Time: 21:04
 */

namespace app\api\model;


class Category extends BaseModel
{
    public function products()
    {
        return $this->hasMany('Product', 'category_id', 'id');
    }

    public function topicImgID(){
        return $this->belongsTo("Image", "topic_img_id", "id");
    }

    public function getAllCategory(){
        $category = $this->with(["topicImgID"])->select();
        return $category;
    }

    public static function getCategory($id)
    {
        $category = self::with('products')
            ->with(["topicImgID", "products.images"])
            ->find($id);
        return $category;
    }
}