<template>
    <main class="main">
        <MyHeader />
        <section class="wrong">
            <div class="wrap">
                <p class="wrong__text">There's nothing here ¯\_(ツ)_/¯</p>
            </div>
        </section>
        <MyFooter />
    </main>
</template>
<script>
import MyHeader from '@/components/MyHeader';
import MyFooter from '@/components/MyFooter';
export default {
    components: {
        MyHeader,
        MyFooter
    }
}
</script>