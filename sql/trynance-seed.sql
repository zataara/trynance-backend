INSERT
    INTO
        users (
            username
            ,password
            ,first_name
            ,last_name
            ,email
            ,is_admin
        )
    VALUES (
        'testuser'
        ,'$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q'
        ,'Test'
        ,'User'
        ,'joel@joelburton.com'
        ,FALSE
    )
    ,(
        'testadmin'
        ,'$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q'
        ,'Test'
        ,'Admin!'
        ,'joel@joelburton.com'
        ,TRUE
    )
; INSERT
    INTO
        faves (
            symbol
            ,user_id
        )
    VALUES (
        'btc'
        ,'testuser'
    )
    ,(
        'eth'
        ,'testuser'
    )
    ,(
        'sol'
        ,'testuser'
    )
    ,(
        'usdc'
        ,'testuser'
    )
    ,(
        'xlm'
        ,'testuser'
    )
; INSERT
    INTO
        assets (
            symbol
            ,user_id
            ,amount
            ,image
            ,name
        )
    VALUES (
        'Polkadot'
        ,'testuser'
        ,4
        ,'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        ,'Polkadot'
    )
    ,(
        'Shiba Inu'
        ,'testuser'
        ,100000
        ,'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        ,'Shiba Inu'
    )
    ,(
        'Binance USD'
        ,'testuser'
        ,5000
        ,'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        ,'Binance USD'
    )
    ,(
        'Cosmos'
        ,'testuser'
        ,22
        ,'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        ,'Cosmos'
    )
; INSERT
    INTO
        trades (
            user_id
            ,currency_from_amount
            ,currency_from_price
            ,currency_from_image
            ,currency_from
            ,currency_to_amount
            ,currency_to_price
            ,currency_to_image
            ,currency_to
            ,DATE
        )
    VALUES (
        'testuser'
        ,1
        ,63000
        ,'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        ,'Bitcoin'
        ,10
        ,6000
        ,'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        ,'Ethereum'
        ,'Mon Jan 1 2022'
    )
    ,(
        'testuser'
        ,10
        ,2
        ,'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        ,'XRP'
        ,10
        ,1
        ,'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        ,'Stellar'
        ,'Mon Jan 8 2022'
    )
    ,(
        'testuser'
        ,1
        ,1000000
        ,'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        ,'Shiba Inu'
        ,1
        ,60
        ,'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        ,'EOS'
        ,'Mon Jan 17 2022'
    )
;
