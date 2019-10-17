<template>
    <section>
        <ul class="inventory-list">
            <li class="inventory_item clearfix">
                <dd class="inventory-list-title">项目名称：</dd>
                <dt class="inventory-list-content">{{ projectDetail.name }}</dt>
            </li>
            <li class="inventory_item clearfix">
                <dd class="inventory-list-title">项目目标：</dd>
                <dt class="inventory-list-content">{{ projectDetail.goal }}</dt>
            </li>
            <li class="inventory_item clearfix">
                <dd class="inventory-list-title">项目内容：</dd>
                <dt class="inventory-list-content">{{ projectDetail.content }}</dt>
            </li>
            <li class="inventory_item clearfix">
                <dd class="inventory-list-title">项目期限：</dd>
                <dt class="inventory-list-content">{{ projectDetail.startDate | dateFormat('yyyy-MM-dd') }} —