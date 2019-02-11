<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-22
 * Time: 15:50
 */

namespace app\api\model;


class ProductImage extends BaseModel
{
    protected $hidden = ['img_id', 'delete_time', 'product_id'];

    public function imgUrl()
    {
        return $this->belongsTo('Image', 'img_id', 'id');
    }
}