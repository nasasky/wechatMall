<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-22
 * Time: 15:42
 */

namespace app\api\model;

class Product extends BaseModel
{
    public function images(){
        return $this->hasMany("ProductImage", "product_id", "id");
    }

    public function properties(){
        return $this->hasMany("ProductProperty", "product_id", "id");
    }

    public function category(){
        return $this->belongsTo("Category", "category_id", "id");
    }

    public static function getProductDetail($id){
        $product = self::with(
            [
                'images' => function ($query)
                {
                    $query->with(['imgUrl'])
                        ->order('order', 'asc');
                }])
            ->with('properties')
            ->find($id);
        return $product;
    }

    public function getMainImgUrlAttr($value, $data)
    {
        return $this->prefixImgUrl($value, $data);
    }

    public static function getAllProductsPage($size=10, $current_page=1){
        $products = self::with(["images", "properties", "category"])->paginate($size,true, ["page"=>$current_page]);
        return $products;
    }

    public static function getAllProducts(){
        $products = self::with(["images", "properties", "category"])->select();
        return $products;
    }

    public static function searchProductsByKey($name, $key){
        $result = self::where('name', 'like', "%".$key."%")
            ->select();
        return $result;

    }
}