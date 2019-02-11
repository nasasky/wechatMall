<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-22
 * Time: 15:59
 */

namespace app\api\controller\v1;


use app\api\controller\BaseController;
use app\api\validate\ProductValidate;
use app\api\validate\IDMustBeIPositiveInt;
use app\api\validate\PagingParameterValidate;
use app\exception\DeleteException;
use app\exception\MissingException;
use app\exception\ParameterException;
use app\exception\ProductException;
use app\api\model\Product as ProductModel;
use app\exception\SuccessMessage;

class Product extends BaseController
{
    protected $beforeActionList = [
        'checkSuperScope'  =>  ['only'=>'delete,updateproduct,createproduct'],
    ];

    /**
     * 获取单一商品的详情
     * @param $id
     * @return array|false|\PDOStatement|string|\think\Model
     * @throws ProductException
     * @throws \app\exception\ParameterException
     */
    public function getProductDetail($id){
        (new IDMustBeIPositiveInt())->toCheck();
        $product = ProductModel::getProductDetail($id);
        if (!$product)
        {
            throw new ProductException();
        }
        return $product;
    }

    //分页方式获取所有商品
    public function getAllProductsPage($size=10, $current_page=1){
        (new PagingParameterValidate())->toCheck();
        $products = ProductModel::getAllProductsPage($size, $current_page);
        if (!$products)
        {
            throw new ProductException();
        }
        return $products;
    }

    public function getAllProducts(){
        $products = ProductModel::getAllProducts();
        if (!$products)
        {
            throw new ProductException();
        }
        return $products;
    }

    public function delete($id)
    {
        (new IDMustBeIPositiveInt())->toCheck();
        $result = ProductModel::destroy($id);
        if ($result){
            throw new SuccessMessage();
        }
        throw new DeleteException();
    }

    public function updateProduct(){
        (new ProductValidate())->toCheck();
        $data = request()->post();
        $result = ProductModel::update($data);
        if ($result){
            throw new SuccessMessage();
        }
        throw new ProductException();
    }

    public function createProduct(){
        (new ProductValidate())->toCheck();
        $data = request()->post();
        $result = ProductModel::create($data);
        if ($result){
            throw new SuccessMessage();
        }
        throw new ProductException($message="创建商品失败！");
    }

    public function searchProductsByName($key=""){
        if (!$key){
            throw new ParameterException();
        }
        $name = "name";
        $result = ProductModel::searchProductsByKey($name, $key);
        if (!$result){
            throw new MissingException();
        }
        return $result;
    }
}