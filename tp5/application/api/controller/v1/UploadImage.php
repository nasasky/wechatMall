<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-11
 * Time: 19:30
 */

namespace app\api\controller\v1;


use app\api\controller\BaseController;
use app\exception\UploadImageException;
use app\api\model\Image;

class UploadImage extends BaseController
{
    public function upload(){
        $file = request()->file("Filedata");
        if($file){
            $info = $file->validate(['size'=>1024*1024,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'images');
            if($info){
                $img_name = str_replace("\\", "/", $info->getSaveName());

                $img = Image::create(["url" => $img_name, "from" => 1] );

                return ["code" => 200, "img_info" => $img_name, "img" => $img];
            }else{
                return new UploadImageException($file->getError());
            }
        }
        return new UploadImageException();
    }
}