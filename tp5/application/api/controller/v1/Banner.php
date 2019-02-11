<?php 
namespace app\api\controller\v1;

use app\api\validate\IDMustBeIPositiveInt;
use app\exception\MissingException;
use think\Controller;
use app\api\model\Banner as BannerModel;

class Banner extends Controller{
    /**
     * 通过ID获取Banner
     * @param $id
     * @return array
     * @throws MissingException
     * @throws \app\exception\ParameterException
     */
	public function getBanner($id){
        (new IDMustBeIPositiveInt())->toCheck();
        $banner = BannerModel::getBannerByID($id);
        if(!$banner){
            throw new MissingException("请求的Banner不存在", 40000);
        }
        return $banner;
	}
}