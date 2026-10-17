#!/usr/bin/env python3
"""Download original institution logos and research teaser images to this repository.
Run from the repository root: python3 scripts/fetch_assets.py
Requires internet access; source sites may change and can require a manual download.
"""
from pathlib import Path
from urllib.request import Request, urlopen

ROOT=Path(__file__).resolve().parent.parent
ASSETS={
    "assets/images/organizations/pku.png": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Peking_University_seal.svg/480px-Peking_University_seal.svg.png",
        "https://miyandoris.github.io/images/peking_university.png",
    ],
    "assets/images/organizations/galbot.png": [
        "https://flagopen.github.io/RoboCOIN/assets/galbot-UpoV8OT2.png",
    ],
    "assets/images/publications/zeta.png": [
        "https://miyandoris.github.io/images/ZETA.png",
    ],
    "assets/images/publications/stereovla.png": [
        "https://miyandoris.github.io/images/StereoVLA.png",
    ],
    "assets/images/publications/graspvla.jpg": [
        "https://pku-epic.github.io/GraspVLA-web/images/teaser.jpg",
    ],
}

def download(path, urls):
    out=ROOT/path
    if out.exists() and out.stat().st_size>200:
        print('SKIP ',path);return True
    out.parent.mkdir(parents=True,exist_ok=True)
    for url in urls:
        try:
            req=Request(url,headers={'User-Agent':'Mozilla/5.0 BirdBlog personal homepage'})
            with urlopen(req,timeout=25) as response:
                data=response.read()
                ct=response.headers.get('Content-Type','')
            if len(data)<200 or ('image' not in ct and not (data[:8]==b'\x89PNG\r\n\x1a\n' or data[:3]==b'\xff\xd8\xff')):
                raise ValueError('Not an image: '+ct)
            out.write_bytes(data)
            print('SAVED',path,len(data),'bytes from',url)
            return True
        except Exception as e:
            print('FAILED',url,type(e).__name__,str(e)[:120])
    return False

if __name__=='__main__':
    count=0
    for path, urls in ASSETS.items():
        count+=download(path,urls)
    print(f'{count}/{len(ASSETS)} images ready. Commit these files for fully local images.')
