<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\Route;

//Theme
Route::get("api/:version/theme/", "api/:version.Theme/getTheme");
Route::get("api/:version/theme/all", "api/:version.Theme/getAllThemes");
Route::get("api/:version/theme/:id", "api/:version.Theme/getThemeByID");
Route::delete('api/:version/theme/delete', 'api/:version.Theme/delete');


//Token
Route::post("api/:version/token/user", "api/:version.Token/getToken");
Route::post('api/:version/token/app', 'api/:version.Token/getAppToken');
Route::get("api/:version/token/verify", "api/:version.Token/verify");
Route::get('api/:version/token/app/username', 'api/:version.Token/getAppUsername');


//Banner
Route::get("api/:version/banner/:id", "api/:version.Banner/getBanner");

//Product
Route::get("api/:version/product/all", "api/:version.Product/getAllProducts");
Route::get("api/:version/product/all/page", "api/:version.Product/getAllProductsPage");
Route::delete('api/:version/product/delete', 'api/:version.Product/delete');
Route::post('api/:version/product/update', 'api/:version.Product/updateProduct');
Route::post('api/:version/product/create', 'api/:version.Product/createProduct');
Route::get("api/:version/product/search", "api/:version.Product/searchProductsByName");
Route::get("api/:version/product/:id", "api/:version.Product/getProductDetail");


//Category
Route::get('api/:version/category/all', 'api/:version.Category/getAllCategories');
Route::delete('api/:version/category/delete', 'api/:version.Category/delete');
Route::post('api/:version/category/update', 'api/:version.Product/updateCategory');
Route::post('api/:version/category/create', 'api/:version.Product/createCategories');
Route::get('api/:version/category/:id', 'api/:version.Category/getCategories');

//Captcha
Route::get("api/:version/captcha", "api/:version.MyCaptcha/getCaptcha");

//Upload
Route::post("api/:version/image/upload", "api/:version.UploadImage/upload");

//Address
Route::post('api/:version/address', 'api/:version.Address/addOrUpdateAddress');
Route::get('api/:version/address', 'api/:version.Address/getAddress');

