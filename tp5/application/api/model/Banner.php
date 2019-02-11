<?php
namespace app\api\model;

use app\api\model\BaseModel;
use app\api\validate\IDMustBeIPositiveInt;
use app\exception\MissingException;

class Banner extends BaseModel{
	public function items(){
		return $this->hasMany("BannerItem", "banner_id", "id");
	}

	public static function getBannerByID($id){
		$banner = self::with(["items", "items.img"])->find($id);
		return $banner;
	}
}
