<?php
namespace app\api\model;

use app\api\model\BaseModel;

class BannerItem extends BaseModel{

	public function img(){
        return $this->belongsTo('Image','img_id','id');
    }
}