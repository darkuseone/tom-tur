"""Звук выпуска 025 — Варшава: SFX и атмосферы от событий картинки (ev.json). Семейство переходов — рама, кисть, холст, пепел, дым, огонь, краска.
Подпись выпуска — аккорд рояля (первый и последний звук, петля), мазок кисти на «рисующих» событиях; музыка — фортепианный вальс с битом."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: аккорд рояля с 0,0 с, мазок кисти «дописывает» дома, стук кистью по раме, голуби, вопрос, отмотка
        ('piano_sting', 0.0, -3), ('brush_stroke', 0.05, 0), ('brush_stroke', 0.7, -2), ('shimmer', 1.2, -12),
        ('wood_bonk', e('hk_pict', -0.05), -4), ('shimmer', e('hk_pict', 0.05), -8), ('dust_whoosh', e('hk_pict', 0.1), -14), ('pencil_scribble', e('hk_whose'), -8), ('tiny_tuk', e('hk_whose', 0.2), -6),
        ('watch_click', E['h2'], -2), ('rewind', E['h2'] + 0.15, -6),
        # отмотка: мазок в кадр, свист оборота, золотая рама летит в камеру, вспышка
        ('brush_stroke', S0['tunnel'] - 0.2, 0), ('time_zoom', S0['tunnel'] - 0.05, -6), ('spin_whoosh', S0['tunnel'] + 0.05, -3), ('whip_whoosh', S0['tunnel'] + 0.9, -4), ('shimmer', S0['tunnel'] + 1.2, -6),
        # 1984: рама пролетает, карточка главы, бирка «средневековье?», часы пошли, лента, голуби, счётчик лет, монета в ящик и звон монет
        ('whip_whoosh', S0['castle'] - 0.1, -6), ('teleport_pop', S0['castle'] + 0.05, -8), ('stamp_thud', S0['castle'] + 0.3, -8), ('tiny_tuk', e('ca_mid'), -6), ('pencil_scribble', e('ca_open', 0.05), -10),
        ('clock_tick_heavy', e('ca_open'), -4), ('church_bell_toll', e('ca_open', 0.1), -12), ('cloth_rip', e('ca_open', 0.1), -8), ('crowd_cheer', e('ca_open', 0.2), -16), ('tiny_tuk', e('ca_84'), -6), ('metronome_tick', e('ca_84', 0.3), -12),
        ('coins_pouch', e('ca_coin', -0.05), -2), ('goblet_clink', e('ca_coin', 0.15), -10),
        # 1980: мазок, окна загораются, штамп с размаху + вспышки фото, торт и смешок
        ('brush_stroke', S0['unesco'] - 0.2, -1), ('paper_whoosh', S0['unesco'] + 0.05, -10), ('switch_clunk', e('un_80'), -10), ('bulbs_chain_on', e('un_80', 0.05), -6),
        ('whip_whoosh', e('un_stamp', -0.2), -10), ('stamp_thud', e('un_stamp', 0.08), 0), ('camera_shutter', e('un_stamp', 0.2), -6), ('camera_shutter', e('un_stamp', 0.45), -8), ('tiny_tuk', e('un_old'), -10),
        ('teleport_pop', e('un_30', -0.15), -6), ('fireworks', e('un_30', 0.1), -18), ('shimmer', e('un_30', 0.2), -10),
        # 1950: холст сдёргивают, стройка, лучи от картины, подпись, «Венеция?»
        ('cloth_rip', S0['build'] - 0.1, -4), ('silk_swish', S0['build'] + 0.05, -6), ('chisel_strike', S0['build'] + 0.5, -10), ('shimmer', e('bu_copy'), -6), ('brush_stroke', e('bu_copy', 0.2), -2),
        ('pencil_scribble', e('bu_sign'), -6), ('shimmer', e('bu_can'), -4), ('piano_sting', e('bu_can', 0.05), -12), ('poof_cloth', e('bu_same'), -10), ('tiny_tuk', e('bu_same', 0.15), -6),
        # 1945: кадр рассыпается пеплом, ветер, карточка главы, свиток крошится, кирпичи падают, карта 85 %
        ('dust_whoosh', S0['ruins'] - 0.25, -2), ('fire_burn_through', S0['ruins'] - 0.1, -10), ('stamp_thud', S0['ruins'] + 0.3, -6), ('wind_gust', S0['ruins'] + 0.4, -10),
        ('paper_whoosh', e('ru_draw'), -6), ('dust_whoosh', e('ru_gone'), -8), ('collapse_rumble', e('ru_dest'), -4), ('rock_knock', e('ru_dest', 0.3), -8), ('rock_knock', e('ru_dest', 0.55), -10),
        ('tiny_tuk', e('ru_85'), -4), ('metronome_tick', e('ru_85', 0.3), -10), ('stamp_thud', e('ru_85', 0.9), -8),
        # 1944: клуб дыма, камень на баррикаду, флаг, календарь, сапоги, дома оседают один за другим, лист — зачёркивание
        ('dust_whoosh', S0['rising'] - 0.2, -4), ('cannon_boom', S0['rising'] - 0.05, -14), ('rock_knock', e('ri_up'), -2), ('sail_flap', e('ri_up', 0.1), -6), ('crowd_cheer', e('ri_up', 0.15), -18),
        ('paper_whoosh', e('ri_63'), -8), ('clock_tick_heavy', e('ri_63', 0.2), -10), ('marching_boots', e('ri_after'), -8),
        ('collapse_rumble', e('ri_blow'), -4), ('cannon_boom', e('ri_blow', 0.45), -10), ('collapse_rumble', e('ri_blow', 0.9), -6), ('cannon_boom', e('ri_blow', 1.35), -12),
        ('pencil_scribble', e('ri_list'), -4), ('tiny_tuk', e('ri_list', 0.4), -8),
        # 1939: прожжённая дыра, пожар за окном, рама вырвана, ящики, грузовик, возвращение — рама на стене
        ('fire_burn_through', S0['loot'] - 0.15, -4), ('lantern_whoosh', e('lo_pics'), -10), ('fire_flare', e('lo_39'), -4), ('cloth_rip', e('lo_take'), -6), ('wood_bonk', e('lo_take', 0.2), -6),
        ('boxcar_door_slide', e('lo_de', -0.1), -8), ('tractor_engine', e('lo_de', 0.1), -14), ('piano_sting', e('lo_back'), -8), ('wood_bonk', e('lo_back', 0.5), -6), ('stamp_thud', e('lo_back', 0.25), -8),
        # 1770: краска стекает, карета, имя-бирка, ответ, портрет дяди, фанфара, подпись кистью, подмигивание
        ('brush_stroke', S0['painter'] - 0.15, 0), ('horse_neigh', S0['painter'] + 0.4, -14), ('stamp_thud', S0['painter'] + 0.3, -8), ('teleport_pop', e('pa_bern', -0.1), -8),
        ('shimmer', e('answer'), -4), ('piano_sting', e('answer', 0.02), -6), ('poof_cloth', e('pa_neph', -0.1), -10), ('medal_fanfare', e('pa_great'), -12),
        ('brush_stroke', e('pa_sign'), 2), ('pencil_scribble', e('pa_sign', 0.3), -6), ('tiny_tuk', e('pa_uncle'), -6),
        # сегодня: холст наплывает, круг на картине, пунктир, кирпичи взлетают и встают, штамп
        ('whip_whoosh', S0['today'] - 0.15, -6), ('shimmer', S0['today'] + 0.2, -10), ('shimmer', e('to_fancy'), -6), ('pencil_scribble', e('to_fac'), -6),
        ('chisel_strike', e('to_built'), -6), ('rock_knock', e('to_built', 0.3), -8), ('rock_knock', e('to_built', 0.6), -8), ('stamp_thud', e('to_fict', 0.05), -2), ('tiny_tuk', e('to_fict', 0.3), -8),
        # кнопка: вспышка, бирки, жест, мазок обратно — дома снова эскиз; без финального удара — музыка затухает
        ('shimmer', S0['button'] - 0.1, -8), ('tiny_tuk', e('bt_q'), -6), ('tiny_tuk', e('bt_q', 0.25), -6), ('whip_whoosh', e('bt_write'), -10), ('brush_stroke', e('bt_go'), -2),
    ]
    beds = [('old_square_loop', 0, S0['tunnel']), ('old_square_loop', S0['castle'], S1['castle']), ('night_city_loop', S0['unesco'], S1['unesco']), ('construction_loop', S0['build'], S1['build']),
            ('blizzard_loop', S0['ruins'], S1['ruins']), ('campfire_loop', S0['ruins'], S1['ruins']), ('city_fire_loop', S0['rising'], S1['rising']), ('city_fire_loop', S0['loot'], S1['loot']),
            ('street_1770_loop', S0['painter'], S1['painter']), ('old_square_loop', S0['today'], S1['today']), ('old_square_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_warszawa', music_duck=[(S0['ruins'] - 0.1, S1['rising'], -9), (S0['loot'], E['lo_back'], -5)])
