<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-04
 * Time: 16:19
 */

namespace app\api\model;


class Theme extends BaseModel
{
    public function topicImgID(){
        return $this->belongsTo("Image", "topic_img_id", "id");
    }

    public function headImgID(){
        return $this->belongsTo("Image", "head_img_id", "id");
    }

    public function products(){
        return $this->belongsToMany("Product", "theme_product", 'product_id', 'theme_id');
    }
    public function getThemes($ids){
        $result = $this->with(["topicImgID", "headImgID"])->select($ids);
        return $result;
    }
    public function getThemeByID($id)
    {
        $themes = self::with(["topicImgID", "headImgID", "products"])
            ->find($id);
        return $themes;
    }

    public function getAllThemes(){
        $themes = self::with(["topicImgID", "headImgID", "products"])->select();
        return $themes;
    }

}