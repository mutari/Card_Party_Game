<?php

namespace App\Controller;

use App\Entity\Card;
use App\Form\CardType;
use App\Repository\CardRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/card")
 */
class CardController extends AbstractController
{
    /**
     * @Route("/", name="card_index", methods={"GET"})
     */
    public function index(CardRepository $cardRepository): Response
    {
        return $this->render('card/index.html.twig', [
            'cards' => $cardRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="card_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $card = new Card();
        $form = $this->createForm(CardType::class, $card);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($card);
            $entityManager->flush();

            return $this->redirectToRoute('card_index');
        }

        return $this->render('card/new.html.twig', [
            'card' => $card,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="card_show", methods={"GET"})
     */
    public function show(Card $card): Response
    {
        return $this->render('card/show.html.twig', [
            'card' => $card,
        ]);
    }

    /**
     * @Route("/one/new", name="card_get_one_new", methods={"GET"})
     */
    public function getOneNew(Request $request, CardRepository $cardRep): Response
    {   
        
        $amount_cards = $cardRep->createQueryBuilder('a')
            ->select('count(a.id)')
            ->getQuery()
            ->getSingleScalarResult();

        return $this->redirectToRoute('card_get_one', array('id' => $this->GenerateNewCard($cardRep, $request, $amount_cards)));
    }

    /**
     * @Route("/one/{id}", name="card_get_one", methods={"GET"})
     */
    public function getOne(Request $request, Card $card)
    {
        return $this->render('card/oneCard.html.twig', [
            'card' => $card
        ]);
    }

    /**
     * @Route("/{id}/edit", name="card_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Card $card): Response
    {
        $form = $this->createForm(CardType::class, $card);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('card_index');
        }

        return $this->render('card/edit.html.twig', [
            'card' => $card,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="card_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Card $card): Response
    {
        if ($this->isCsrfTokenValid('delete'.$card->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($card);
            $entityManager->flush();
        }

        return $this->redirectToRoute('card_index');
    }


    public function GenerateNewCard(CardRepository $cardRep, Request $request, $amount_cards) 
    {
        $random_id = rand(1, $amount_cards);

        $res = $cardRep->find($random_id);

        $tags = $request->query->get("tags");

        $CardTags = explode(",", $res->getTag());
        $UserTags = explode(",", $tags);

        if($tags != "null" || !is_null($tags))
        {
            foreach($CardTags as $CardValue) 
            {
                $bool = false;
                foreach($UserTags as $UserValue)
                {
                    if($CardValue == $UserValue) 
                    {
                        $bool = true;
                        break;
                    }
                }
                if(!$bool)
                    return $this->GenerateNewCard($cardRep, $request, $amount_cards);
            }
        }

        return $random_id;
    }

}
