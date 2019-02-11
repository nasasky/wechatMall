<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-04
 * Time: 21:01
 */

namespace app\api\controller\v1;


use app\api\controller\BaseController;
use app\api\model\Category as CategoryModel;
use app\api\validate\CategoryValidate;
use app\api\validate\IDMustBeIPositiveInt;
use app\exception\CategoryException;
use app\exception\DeleteException;
use app\exception\SuccessMessage;


class Category extends BaseController
{
    public function getAllCategories(){
        $categories = (new CategoryModel())->getAllCategory();
        if (!$categories){
            throw new CategoryException();
        }
        return $categories;
    }

    public function getCategories($id)
    {
        $validate = new IDMustBeIPositiveInt();
        $validate->toCheck();
        $category = CategoryModel::getCategory($id);
        if(empty($category)){
            throw new CategoryException([
                'msg' => '无商品信息'
            ]);
        }
        return $category;
    }

    public function createCategories(){
        (new CategoryValidate())->toCheck();
        $data = request()->post();
        $result = CategoryModel::create($data);
        if ($result){
            throw new SuccessMessage();
        }
        throw new CategoryException($message="创建分类失败！");
    }

    public function delete($id)
    {
        (new IDMustBeIPositiveInt())->toCheck();
        $result = CategoryModel::destroy($id);
        if ($result){
            throw new SuccessMessage();
        }
        throw new DeleteException();
    }

    public function updateCategory(){

    }

}