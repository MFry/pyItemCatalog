from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, Menu, connection_str

engine = create_engine(connection_str)

Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()
r = Restaurant(name="Humpy's Great Alaskan Alehouse")
session.add(r)
session.commit()
session.add(Menu(name='Old Fashioned Cheeseburger',
                 course='Lunch',
                 description='All beef classic burgers are topped with cheddar cheese,'
                             ' lettuce, tomato, mayo and sliced red onion. Or add a little'
                             ' extra as follows…',
                 price='$9.99',
                 restaurant_id=r.id
                 ))
session.add(Menu(name='Humpy Burger',
                 course='Lunch',
                 description='Topped with melting cheddar,'
                             ' grilled onions and peppers, on a toasted bun '
                             'with guacamole and salsa.',
                 price='$11.99',
                 restaurant_id=r.id
                 ))
session.add(Menu(name="Humpy's Wings",
                 course='Lunch',
                 description='Meaty chicken drumettes tossed in your choice'
                             ' of our three succulent sauces. Served with celery'
                             ' carrot sticks and blue cheese.',
                 price='$11.99',
                 restaurant_id=r.id
                 ))
session.add(Menu(name="Humpy's Cobb Salad",
                 course='Lunch',
                 description='Crisp romaine lettuce, topped with diced chicken breast,'
                             ' avocado, diced tomatoes, bleu cheese crumbles, crumbled'
                             ' bacon and hard boiled egg. Served with ranch style'
                             ' dressing on the side.',
                 price='$12.99',
                 restaurant_id=r.id
                 ))
r = Restaurant(name="McGinley's Pub")
session.add(r)
session.commit()
session.add(Menu(name="Highland Hummus",
                 course='Lunch',
                 description="European style with diced "
                             "cucumbers, black olives, feta and tomatoes. ",
                 price='$14.25',
                 restaurant_id=r.id))
session.add(Menu(name="Corned Beef & Cabbage",
                 course='Lunch',
                 description="Corned beef brisket cooked daily and served with "
                             "steamed cabbage and potato cakes. ",
                 price='$16.50',
                 restaurant_id=r.id))
session.add(Menu(name="Alaska Bangers and Mash",
                 course='Lunch',
                 description="Traditionally served at Irish wakes on Sunday, but why wait?"
                             "We serve it seven days a week with a"
                             "little twist of Alaska – reindeer sausage and mashed "
                             "potatoes.",
                 price='$15.75',
                 restaurant_id=r.id))
session.add(Menu(name="Firetap Ale House Monk’s Pretzel ",
                 course='Lunch',
                 description="Hand twisted then baked in a ceramic oven daily, lightly"
                             "buttered and served with an aged cheddar sauce or stone"
                             "ground mustard.",
                 price='$7.00',
                 restaurant_id=r.id))
r = Restaurant(name="Bear Tooth Theatrepub")
session.add(r)
session.commit()
session.add(Menu(name="Blackened AK Salmon",
                 course='Lunch',
                 description="Blackened fresh AK salmon, refried black beans,"
                             " tomatillo-cilantro rice, shredded cabbage, mushrooms,"
                             " carrot threads, green onions, and ginger soy sauce.",
                 price='$12.95',
                 restaurant_id=r.id))
session.add(Menu(name="Santa's Little Helper",
                 course='Lunch',
                 description="Pepperoni, blackened chicken, steak, bacon, red peppers,"
                             " cilantro, mozzarella, provolone, marinara.",
                 price='$12.50',
                 restaurant_id=r.id))
session.add(Menu(name="Amazing Apricot",
                 course='Lunch',
                 description="Blackened chicken, cream cheese, apricot sauce, "
                             "fresh red peppers, carrot threads, green onions, "
                             "cilantro, mozzarella, provolone.",
                 price='$10.50',
                 restaurant_id=r.id))
session.add(Menu(name="Fresh Guacamole",
                 course='Lunch',
                 description="Avocado, onion, tomato, garlic, serrano chiles,"
                             " cilantro, lime, and house chips.",
                 price='$10.95',
                 restaurant_id=r.id))
r = Restaurant(name="Muse Cafe")
session.add(r)
session.commit()
session.add(Menu(name="Vegan Vegetable Pot Pie",
                 course='Dinner',
                 description="Turnips + Parsnips + English Peas + Carrots + Sweet Corn + Cashew Gravy",
                 price='$11.00',
                 restaurant_id=r.id))
session.add(Menu(name="Lamb Stew",
                 course='Dinner',
                 description="Freekeh + Chickpeas + Tomatoes + Root Vegetables + Mint Feta Yoghurt",
                 price='$19.00',
                 restaurant_id=r.id))
session.add(Menu(name="Mushroom Risotto",
                 course='Dinner',
                 description="Chanterelles + Black Trumpet + Boursin + Black Truffle ",
                 price='$19.00',
                 restaurant_id=r.id))
session.add(Menu(name="Salmon",
                 course='Dinner',
                 description="Wild Rice + Mirepoix + Kale + Red Onion Confit",
                 price='$23.00',
                 restaurant_id=r.id))
r = Restaurant(name="Glacier Brewhouse")
session.add(r)
session.commit()
session.add(Menu(name="ALASKAN ALDER GRILLED SOCKEYE SALMON",
                 course='Dinner',
                 description="Simply Grilled Alaskan salmon with alder grilled tri-colored fingerling potatoes, Alaskan King Crab meat, fresh grated horseradish, shaved fennel, red onion, tomato and arugula, lightly dressed with a sherry vinaigrette.",
                 price='$',
                 restaurant_id=r.id))
session.add(Menu(name="ROTISSERIE CHICKEN WITH SUCCOTASH",
                 course='Dinner',
                 description="Pancetta, rosemary, garlic served with succotash.",
                 price='$',
                 restaurant_id=r.id))
session.add(Menu(name="BERING SEA KING CRAB CAKES",
                 course='Dinner',
                 description="Roasted corn relish, Thai aiolo & cilantro oil.",
                 price='$',
                 restaurant_id=r.id))
session.add(Menu(name="HERB CRUSTED ALASKAN HALIBUT",
                 course='Dinner',
                 description="Fresh Alaskan halibut coated with basil pesto & spent grain bread crumbs, garlic mashed potatoes, roasted tomato vinaigrette tossed winter greens.",
                 price='$',
                 restaurant_id=r.id))
r = Restaurant(name="Orso")
session.add(r)
session.commit()
session.add(Menu(name="flash seared crab cakes",
                 course='Dinner',
                 description="hand formed dungeness and red crab cakes, truffled fennel salad, pesto aïoli",
                 price='$',
                 restaurant_id=r.id))
session.add(Menu(name="crab stuffed rockfish",
                 course='Dinner',
                 description="spinach, parmesan, artichoke with creamy herbed cauliflower puree, preserved lemon oven roasted green beans and tomato confit",
                 price='$',
                 restaurant_id=r.id))
session.add(Menu(name="lemon chicken panzanella",
                 course='Dinner',
                 description="baby spinach, sweet baby tomatoes, fresh mozzarella, basil, english cucumber, toasted rosemary bread, blue cheese crumbles, champagne dijon dressing, balsamic glaze",
                 price='$',
                 restaurant_id=r.id))
session.add(Menu(name="spicy calamari",
                 course='Dinner',
                 description="buttermilk batter, harissa, artichoke hearts, parsley aïoli",
                 price='$',
                 restaurant_id=r.id))

session.commit()
