import re
import os

# Pools of category-specific clothing/apparel images from Unsplash
UNSPLASH_POOLS = {
    'men': [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80', # suit
        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80', # shirt
        'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80', # casual
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80', # formal
        'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80', # jacket
        'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80', # menswear
        'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80', # jeans
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80', # tshirt
        'https://images.unsplash.com/photo-1495603889488-42d1fc6680bc?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534030716343-40aa521d7c9a?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80'
    ],
    'women': [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80', # dress
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80', # dress
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80', # model
        'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80', # ethnic
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80', # kurti
        'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80', # ethnic
        'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80', # skirt
        'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80', # dress
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
    ],
    'kids': [
        'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80'
    ],
    'beauty': [
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1590156546746-c23109b257c3?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=600&auto=format&fit=crop&q=80'
    ]
}

CATEGORIES_MAPPING = {
    'men': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    'women': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop&q=80',
    'kids': 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&auto=format&fit=crop&q=80',
    'beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80'
}

BANNERS_MAPPING = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80', # shopping sale
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80', # wedding ethnic
    'https://images.unsplash.com/photo-1471286174240-e6458db7d114?w=800&auto=format&fit=crop&q=80', # kids playtime
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'  # cosmetics
]

def update_products():
    path = '/Users/sneha/Downloads/gpmain/src/data/products.js'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We parse the file and replace any picsum URL with Unsplash.
    # To do this correctly and preserve correct category styling, we can loop through products
    # and replace the image urls dynamically depending on whether they're in men/women/kids/beauty.
    # In products.js, the array starts with men, then women, then kids, then beauty.
    # Let's use regular expressions to find all string URLs and replace them.
    # A cleaner way is using a python parser, but regex replacing based on index/matches is also easy.
    # Let's count products and categorize them.
    
    # We can split the content by products:
    # Product block pattern: '{[^}]+id:\s*\'prod_\d+\'[^}]+}'
    # Let's do a simple category-based mapping.
    # In products.js, products are structured like:
    # id: 'prod_001' to 'prod_015' -> men
    # id: 'prod_016' to 'prod_035' -> women
    # id: 'prod_036' to 'prod_047' -> kids
    # id: 'prod_048' to 'prod_055' -> beauty
    
    # Let's define replacement maps:
    new_content = content
    
    # Find all picsum links
    picsum_links = list(set(re.findall(r'https://picsum\.photos/seed/[a-zA-Z0-9_/.-]+', content)))
    
    # Let's replace each picsum link with an unsplash url based on product context.
    # We can parse the file line by line, keeping track of the current category.
    lines = content.split('\n')
    current_category = 'men'
    category_indices = {'men': 0, 'women': 0, 'kids': 0, 'beauty': 0}
    
    for i, line in enumerate(lines):
        # Update current category
        if '// MEN\'S CLOTHING' in line:
            current_category = 'men'
        elif '// WOMEN\'S CLOTHING' in line:
            current_category = 'women'
        elif '// KIDS\' CLOTHING' in line:
            current_category = 'kids'
        elif '// BEAUTY & COSMETICS' in line:
            current_category = 'beauty'
        
        # Look for picsum urls on this line
        matches = re.findall(r'https://picsum\.photos/seed/[a-zA-Z0-9_]+/[0-9]+/[0-9]+', line)
        for m in matches:
            pool = UNSPLASH_POOLS[current_category]
            idx = category_indices[current_category]
            unsplash_url = pool[idx % len(pool)]
            lines[i] = lines[i].replace(m, unsplash_url)
            category_indices[current_category] += 1
            
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print("Products updated successfully!")

def update_categories():
    path = '/Users/sneha/Downloads/gpmain/src/data/categories.js'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace category images
    for cat, url in CATEGORIES_MAPPING.items():
        pattern = rf'https://picsum\.photos/seed/cat{cat}/200/200'
        content = re.sub(pattern, url, content)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Categories updated successfully!")

def update_banners():
    path = '/Users/sneha/Downloads/gpmain/src/data/banners.js'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace banner images
    for idx, url in enumerate(BANNERS_MAPPING):
        pattern = rf'https://picsum\.photos/seed/banner{idx+1}/800/400'
        content = re.sub(pattern, url, content)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Banners updated successfully!")

if __name__ == '__main__':
    update_products()
    update_categories()
    update_banners()
